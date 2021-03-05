import graphene
from graphene import relay, ObjectType
from graphene_django import DjangoObjectType
from graphene_django.filter import DjangoFilterConnectionField
from graphene.utils.str_converters import to_snake_case

from .models import Sermon


class SermonNode(DjangoObjectType):
    id = graphene.ID(source='pk', required=True)

    class Meta:
        model = Sermon
        filter_fields = {
            'user': ['exact'],
            'id': ['exact'],
        }
        interfaces = (relay.Node, )


class Query(graphene.ObjectType):
    my_sermons = DjangoFilterConnectionField(SermonNode)
    sermon_by_id = graphene.Field(
        SermonNode, id=graphene.String())

    def resolve_my_sermons(self, info):
        if not info.context.user.is_authenticated:
            return Sermon.objects.none()
        else:
            return Sermon.objects.all()

    def resolve_sermon_by_id(root, info, id):
        if not info.context.user.is_authenticated:
            return Sermon.objects.none()
        else:
            return Sermon.objects.get(pk=id)


class CreateSermon(graphene.Mutation):
    class Arguments:
        title = graphene.String()
        bcvStart = graphene.String()
        bcvStop = graphene.String()

    create_sermon = graphene.Field(SermonNode)

    @classmethod
    def mutate(cls, root, info, title, bcvStart, bcvStop):
        create_sermon = Sermon(title=title, bcvStart=bcvStart, bcvStop=bcvStop,
                               user=info.context.user)
        create_sermon.save()
        return CreateSermon(create_sermon=create_sermon)


class UpdateSermon(graphene.Mutation):
    class Arguments:
        id = graphene.Int()
        title = graphene.String()
        bcvStart = graphene.String()
        bcvStop = graphene.String()

    update_sermon = graphene.Field(SermonNode)

    @classmethod
    def mutate(cls, root, info, id, title):
        update_sermon = Sermon.objects.get(id=id)
        update_sermon.title = title
        update_sermon.save()
        return UpdateSermon(update_sermon=update_sermon)


class DeleteSermon(graphene.Mutation):
    class Arguments:
        id = graphene.Int()

    delete_sermon = graphene.Field(SermonNode)

    @classmethod
    def mutate(cls, root, info, id):
        delete_sermon = Sermon.objects.get(id=id)
        if delete_sermon.user == info.context.user:
            delete_sermon.delete()
        return


class Mutation(graphene.ObjectType):

    create_sermon = CreateSermon.Field()
    update_sermon = UpdateSermon.Field()
    delete_sermon = DeleteSermon.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)
